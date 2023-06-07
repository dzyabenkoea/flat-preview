import rawFlats from '../flats.json'
import {ArrowRightIcon} from "@heroicons/react/24/outline";
import './App.css'
import sectionPlan from './assets/section-plan.png'
import {useEffect, useState} from "react";
import {Flat, FlatFilter} from "./types";
import Filter from "./components/Filter";
import FlatModal from "./components/FlatModal";
import SortControl from './components/SortControl'

function App() {

    const defaultFilter: FlatFilter = {
        floor: 0,
        price: {from: 0, to: 0},
        rooms: [],
        totalArea: {from: 0, to: 0},
        kitchenArea: {from: 0, to: 0},
        liveArea: {from: 0, to: 0}
    }

    const [currentFlat, setCurrentFlat] = useState<Flat | null>(null)
    const [filterValue, setFilterValue] = useState(defaultFilter)
    const [sortKey, setSortKey] = useState('id')
    const [sortDirectionAsc, setSortDirectionAsc] = useState(true)

    const parsedFlats = parseFlats(rawFlats)
    const [flatList, setFlatList] = useState<Flat[]>(parsedFlats)
    const sortOptions = [
        {key: 'id', value: 'Номер квартиры'},
        {key: 'rooms', value: 'Количетство комнат'},
        {key: 'area_total', value: 'Площадь'},
    ]

    const [itemsOnPage, setItemsOnPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageCount, setPageCount] = useState(calcPageCount)

    function Paginator(props: { currentPage: number, pages: number, onPageChange: (page: number) => void }) {

        const pageList = []
        for (let i = 0; i < props.pages; i++) {
            const isActivePage = i === currentPage
            pageList.push(
                <li className={`rounded border px-2 cursor-pointer text-sm ${isActivePage ? 'bg-red-500 bg-red-600 text-white' : 'bg-white hover:bg-gray-100'}`}
                    onClick={() => props.onPageChange(i)}>{i + 1}
                </li>)
        }

        return <ul className='flex gap-1'>
            {pageList}
        </ul>
    }

    function parseFlats(flats) {
        const parsedFlats = structuredClone(flats)
        for (const flat of parsedFlats) {
            flat.area_total = Number(flat.area_total.replace(',', '.'))
            flat.area_live = Number(flat.area_live.replace(',', '.'))
            flat.area_kitchen = Number(flat.area_kitchen.replace(',', '.'))
        }
        return parsedFlats
    }

    function calcPageCount() {
        return Math.ceil(flatList.length / itemsOnPage)
    }

    function filter(flats) {
        let localFlats = structuredClone(flats)
        localFlats = filterValue.rooms.length ? localFlats.filter((flat: Flat) => filterValue.rooms.includes(flat.rooms)) : localFlats
        localFlats = filterValue.floor !== 0 ? localFlats.filter((flat: Flat) => filterValue.floor === flat.floor) : localFlats
        localFlats = (filterValue.totalArea.from || filterValue.totalArea.to) ? localFlats.filter((flat: Flat) => flat.area_total >= filterValue.totalArea.from && flat.area_total <= filterValue.totalArea.to) : localFlats
        localFlats = (filterValue.liveArea.from || filterValue.liveArea.to) ? localFlats.filter((flat: Flat) => flat.area_live >= filterValue.liveArea.from && flat.area_live <= filterValue.liveArea.to) : localFlats
        localFlats = (filterValue.kitchenArea.from || filterValue.kitchenArea.to) ? localFlats.filter((flat: Flat) => flat.area_kitchen >= filterValue.kitchenArea.from && flat.area_kitchen <= filterValue.kitchenArea.to) : localFlats
        localFlats = (filterValue.price.from || filterValue.price.to) ? localFlats.filter((flat: Flat) => flat.price >= filterValue.price.from && flat.price <= filterValue.price.to) : localFlats
        return localFlats
    }

    function sortFlats(flats: Flat[], sortKey: string, sortAscending: boolean) {

        const sortResult = structuredClone(flats)

        if (sortKey === '')
            return flats

        sortResult.sort((flat: Flat, flat2: Flat) => {
            const value1 = flat[sortKey]
            const value2 = flat2[sortKey]
            if (typeof value1 === 'number')
                return (sortAscending ? 1 : -1) * (value1 - value2);
            else if (typeof value1 === 'string')
                return (sortAscending ? 1 : -1) * value1.localeCompare(value2)
        })

        console.log(sortResult)

        return sortResult
    }

    useEffect(() => {
        if (!flatList)
            return
        let filterAndSortResult = filter(parsedFlats)
        filterAndSortResult = sortFlats(filterAndSortResult, sortKey, sortDirectionAsc)
        setFlatList(structuredClone(filterAndSortResult))

    }, [filterValue, sortKey, sortDirectionAsc])

    useEffect(() => {
        console.log('page count ', calcPageCount())
        setPageCount(calcPageCount())
    }, [flatList, itemsOnPage])

    function generateFlatList() {
        const flat_list = []
        if (!flatList)
            return null
        for (const flat of flatList as Flat[]) {
            flat_list.push(
                <li key={flat.id} className='flat-item px-4 py-2 hover:bg-gray-50 cursor-pointer flex justify-between'
                    onClick={() => setCurrentFlat(flat)}>
                    <div className="flex gap-4 items-center">
                        <span className='text-red-500 font-medium'>{flat.id}</span>
                        <p className='text-gray-500'>комнаты: {flat.rooms} S: {flat.area_total} кв.м.</p>
                    </div>
                    <ArrowRightIcon className='arrow-icon opacity-0 w-4 text-red-500'/>
                </li>)
        }
        return flat_list
    }

    function generateFlatTable(itemsOnPage: number, pageNumber: number) {
        const renderResult = []
        if (!flatList)
            return null

        const startIndex = pageNumber * itemsOnPage;
        const endIndex = (pageNumber + 1) * itemsOnPage
        for (const flat of flatList.slice(startIndex, endIndex) as Flat[]) {
            renderResult.push(
                <tr className='hover:bg-gray-50 cursor-pointer relative flat-item border-t text-sm' onClick={() => {
                    setCurrentFlat(flat)
                }}>
                    <td className='px-2 py-1'>{flat.id}</td>
                    <td className='px-2 py-1'>{flat.floor}</td>
                    <td className='px-2 py-1'>{flat.rooms}</td>
                    <td className='px-2 py-1'>{flat.area_total}</td>
                    <td className='hidden sm:block'><ArrowRightIcon className='opacity-0 arrow-icon h-4 text-red-500'/></td>
                </tr>)
        }

        return <table className='w-full'>
            <thead>
            <th className='px-2 py-1 text-left'>№</th>
            <th className='px-2 py-1 text-left'>Этаж</th>
            <th className='px-2 py-1 text-left'>Комнаты</th>
            <th className='px-2 py-1 text-left'>Площадь</th>
            <th></th>
            </thead>
            <tbody>
            {renderResult}
            </tbody>
        </table>
    }

    return <div className='sm:flex items-center justify-center h-full w-full min-h-screen'>
        <div className='md:grid grid-template-flat-preview gap-4 max-w-[1000px] max-h-screen p-5 sm:m-5 sm:border border-red-500 rounded sm:shadow-xl'>
            <div className='flex flex-col justify-between gap-4'>
                <div className='flex flex-col'>
                    <div className='flex justify-between flex-wrap items-center border-b border-red-500 mb-4'>
                        <h2 className='font-semibold text-2xl py-4 px-4 sticky'>Квартиры</h2>
                        <div className='flex gap-2 items-center'>
                            <Filter filterValue={filterValue} onApply={(newFilter: FlatFilter) => {
                                console.log('set filter value')
                                setFilterValue(newFilter)
                            }}/>
                            <SortControl sortOptions={sortOptions} sortAscending={sortDirectionAsc}
                                         onSortDirectionChange={(value) => setSortDirectionAsc(value)}
                                         sortValue={sortKey}
                                         onSelect={(newValue) => setSortKey(newValue)}/>
                        </div>
                    </div>
                    <div className='overflow-auto'>{generateFlatTable(itemsOnPage, currentPage)}</div>
                </div>
                <div className="flex gap-4 items-center flex-wrap justify-between">
                    <Paginator currentPage={currentPage} pages={pageCount}
                               onPageChange={(newPage) => setCurrentPage(newPage)}
                               className='mt-4'/>

                    <div className='flex gap-2 items-center'>
                        <label htmlFor="elements-on-page">Квартир на странице:</label>
                        <select className='px-1 py-1 rounded border' id="elements-on-page"
                                value={itemsOnPage}
                                onChange={event => setItemsOnPage(Number(event.target.value))}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='hidden md:block p-5'>
                <img src={sectionPlan} alt=""/>
            </div>
            <FlatModal flatData={currentFlat} onClose={() => setCurrentFlat(null)}/>
        </div>
    </div>
}

export default App