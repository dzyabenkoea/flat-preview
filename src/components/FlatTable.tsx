import {Flat} from "../types";
import {ArrowRightIcon} from "@heroicons/react/24/outline";
import React from "react";

interface FlatTableProps {
    itemsOnPage: number,
    pageNumber: number,
    flatList: Flat[],
    rowClicked: (flat: Flat) => void
}

export default function FlatTable(props: FlatTableProps) {
    const renderResult = []
    if (!props.flatList)
        return null

    const startIndex = props.pageNumber * props.itemsOnPage;
    const endIndex = (props.pageNumber + 1) * props.itemsOnPage
    for (const flat of props.flatList.slice(startIndex, endIndex) as Flat[]) {
        renderResult.push(
            <tr className='hover:bg-gray-50 cursor-pointer relative flat-item border-t text-sm' onClick={() => {
                props.rowClicked(flat)
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