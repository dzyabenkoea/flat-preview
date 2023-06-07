import {ReactChild, ReactChildren, useEffect, useReducer, useState} from "react";
import {AdjustmentsHorizontalIcon, ArrowDownIcon, ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/outline";
import CheckBox from "./CheckBox";
import {act} from "react-dom/test-utils";
import {FlatFilter} from "../types";

function Filter(props: { filterValue, onApply: (filterValue) => void }) {

    const defaultFilter = {
        floor: 0,
        price: {active: false, from: 0, to: 0},
        rooms: [],
        totalArea: {active: false, from: 0, to: 0},
        kitchenArea: {active: false, from: 0, to: 0},
        liveArea: {active: false, from: 0, to: 0}
    } as FlatFilter

    const [open, setOpen] = useState(false)
    const [filterValue, updateFilter] = useReducer(filterValueReducer, props.filterValue)

    const [extraFiltersVisible, setExtraFiltersVisible] = useState(false)

    function filterValueReducer(filterState: FlatFilter, action) {
        let stateCopy = structuredClone(filterState)
        if (action.type === 'rooms')
            stateCopy.rooms = structuredClone(action.value)
        else if (action.type === 'full')
            stateCopy = structuredClone(action.value)
        else if (action.type === 'price-from')
            stateCopy.price.from = action.value
        else if (action.type === 'price-to')
            stateCopy.price.to = action.value
        else if (action.type === 'floor')
            stateCopy.floor = action.value
        else if (action.type === 'totalArea-from')
            stateCopy.totalArea.from = action.value
        else if (action.type === 'totalArea-to')
            stateCopy.totalArea.to = action.value
        else if (action.type === 'liveArea-from')
            stateCopy.liveArea.from = action.value
        else if (action.type === 'liveArea-to')
            stateCopy.liveArea.to = action.value
        else if (action.type === 'kitchenArea-from')
            stateCopy.kitchenArea.from = action.value
        else if (action.type === 'kitchenArea-to')
            stateCopy.kitchenArea.to = action.value

        return stateCopy
    }

    function closeModal() {
        // resetFilter()
        console.log(123)
        setOpen(false)
        document.querySelector('body').removeEventListener('click', closeModal)
    }

    function resetFilter() {
        updateFilter({type: 'full', value: defaultFilter})
    }

    useEffect(() => {
        if (open) {
            console.log('listener')
            document.querySelector('body').addEventListener('click', closeModal)
        }
    }, [open])

    function filterIconClickHandler(event) {
        event.stopPropagation()
        setOpen(!open)
    }

    function toggleValueInArray(toggle: boolean, array: number[], value) {
        const searchResult = array.find(el => value === el)
        if (searchResult) {
            return array.filter(el => el !== value)
        }
        array.push(value)
        return array
    }

    function renderRoomOptions() {
        const rooms = 4;
        const list = [];
        for (let i = 0; i < rooms; i++) {
            const key = (i + 1)
            list.push(
                <CheckBox key={key} checked={filterValue.rooms.includes(key)} label={key.toString()}
                          onChange={(checked: boolean) => {
                              updateFilter({type: 'rooms', value: toggleValueInArray(checked, filterValue.rooms, key)})
                          }}/>)
        }
        return list
    }

    function applyFilter() {
        setOpen(false)
        console.log(filterValue)
        props.onApply(filterValue)
    }

    function renderExtraFilters() {
        return <div>
            <section className='mt-3'>
                <h3 className='font-medium'>Жилая площадь (кв.м):</h3>
                <div className="flex gap-2 price-inputs">
                    <div className="flex flex-col gap-1 min-w-[2rem]">
                        <label htmlFor="flat-filter-live-area-from">От:</label>
                        <input value={filterValue.liveArea.from} className='px-2 py-1 border'
                               id='flat-filter-live-area-from'
                               type="number" onChange={(event) => updateFilter({
                            type: 'liveArea-from',
                            value: Number(event.target.value)
                        })}/>
                    </div>
                    <div className="flex flex-col gap-1 min-w-[2rem]">
                        <label htmlFor="flat-filter-live-area-to">до:</label>
                        <input value={filterValue.liveArea.to} className='px-2 py-1 border'
                               id='flat-filter-live-area-to'
                               type="number" onChange={(event) => updateFilter({
                            type: 'liveArea-to',
                            value: Number(event.target.value)
                        })}/>
                    </div>
                </div>
            </section>
            <section className='mt-3'>
                <h3 className='font-medium'>Площадь кухни (кв.м):</h3>
                <div className="flex gap-2 price-inputs">
                    <div className="flex flex-col gap-1 min-w-[2rem]">
                        <label htmlFor="flat-filter-kitchen-area-from">От:</label>
                        <input value={filterValue.kitchenArea.from} className='px-2 py-1 border'
                               id='flat-filter-kitchen-area-from'
                               type="number" onChange={(event) => updateFilter({
                            type: 'kitchenArea-from',
                            value: Number(event.target.value)
                        })}/>
                    </div>
                    <div className="flex flex-col gap-1 min-w-[2rem]">
                        <label htmlFor="flat-filter-kitchen-area-to">до:</label>
                        <input value={filterValue.kitchenArea.to} className='px-2 py-1 border'
                               id='flat-filter-kitchen-area-to'
                               type="number" onChange={(event) => updateFilter({
                            type: 'kitchenArea-to',
                            value: Number(event.target.value)
                        })}/>
                    </div>
                </div>
            </section>
        </div>
    }

    return <div>
        <AdjustmentsHorizontalIcon className='cursor-pointer text-red-500 h-6' onClick={filterIconClickHandler}/>
        <div className='absolute z-10 w-full left-0 sm:w-fit sm:left-auto sm:top-auto'>
            <div
                className={(open ? 'flex' : 'hidden') + ' mt-4 bg-white p-5 rounded shadow-md border flex-col'}
                onClick={event => event.stopPropagation()}>
                <section className='mt-3'>
                    <h3 className='font-medium'>Этаж</h3>
                    <input className='px-2 py-1 border mt-2' type="number" min={0} max={20} value={filterValue.floor}
                           onChange={(event) => updateFilter({type: 'floor', value: Number(event.target.value)})}/>
                </section>
                <section className='mt-3'>
                    <h3 className='mt-3 font-medium'>Количество комнат:</h3>
                    <div className="flex gap-3">
                        {renderRoomOptions()}
                    </div>
                </section>

                <section className='mt-3'>
                    <h3 className='font-medium'>Общая площадь (кв.м):</h3>
                    <div className="flex gap-2 price-inputs">
                        <div className="flex flex-col gap-1 min-w-[2rem] ">
                            <label htmlFor="flat-filter-area-from">От:</label>
                            <input value={filterValue.totalArea.from} className='px-2 py-1 border'
                                   id='flat-filter-area-from'
                                   type="number" onChange={(event) => updateFilter({
                                type: 'totalArea-from',
                                value: Number(event.target.value)
                            })}/>
                        </div>
                        <div className="flex flex-col gap-1 min-w-[2rem] ">
                            <label htmlFor="flat-filter-area-to">до:</label>
                            <input value={filterValue.totalArea.to} className='px-2 py-1 border'
                                   id='flat-filter-area-to'
                                   type="number" onChange={(event) => updateFilter({
                                type: 'totalArea-to',
                                value: Number(event.target.value)
                            })}/>
                        </div>
                    </div>
                </section>
                <section className='mt-3'>
                    <h3 className='font-medium'>Цена:</h3>
                    <div className="flex gap-2 price-inputs">
                        <div className="flex flex-col gap-1 min-w-[2rem] ">
                            <label htmlFor="flat-filter-price-from">От:</label>
                            <input value={filterValue.price.from} className='px-2 py-1 border'
                                   id='flat-filter-price-from'
                                   type="number" onChange={(event) => updateFilter({
                                type: 'price-from',
                                value: Number(event.target.value)
                            })}/>
                        </div>
                        <div className="flex flex-col gap-1 min-w-[2rem] ">
                            <label htmlFor="flat-filter-price-to">до:</label>
                            <input value={filterValue.price.to} className='px-2 py-1 border' id='flat-filter-price-to'
                                   type="number" onChange={(event) => updateFilter({
                                type: 'price-to',
                                value: Number(event.target.value)
                            })}/>
                        </div>
                    </div>
                </section>
                <section className='mt-3'>
                    <h3 className='text-red-500 flex gap-2 items-center cursor-pointer hover:bg-gray-50 rounded p-2 select-none'
                        onClick={() => setExtraFiltersVisible(!extraFiltersVisible)}>
                        {extraFiltersVisible ? <ChevronUpIcon className='h-4'/> : <ChevronDownIcon className='h-4'/>}
                        Дополнительные параметры
                    </h3>
                    <div className='flex gap-2 flex-col'>
                        {extraFiltersVisible ? renderExtraFilters() : null}
                    </div>
                </section>

                <div className="flex gap-2 mt-4 self-end">
                    <button className='bg-gray-50 px-3 py-1 rounded' onClick={resetFilter}>Сбросить</button>
                    <button className='bg-red-500 font-medium text-white px-3 py-1 rounded'
                            onClick={applyFilter}>Применить
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default Filter