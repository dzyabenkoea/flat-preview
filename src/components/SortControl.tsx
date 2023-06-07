import {BarsArrowDownIcon, BarsArrowUpIcon} from "@heroicons/react/24/outline";

interface SortControlProps {
    sortValue: string,
    sortAscending: boolean,
    sortOptions: { key: string, value: string }[],
    onSortDirectionChange: (asc: boolean) => void,
    onSelect: (sortKey: string) => void
}

export default function SortControl(props: SortControlProps) {
    function renderOptions() {
        const options = []
        for (const option of props.sortOptions) {
            options.push(<option value={option.key}>{option.value}</option>)
        }
        return options
    }

    return <div className='flex items-center gap-2'>
        <div className='cursor-pointer' onClick={() => props.onSortDirectionChange(!props.sortAscending)}>
            {props.sortAscending ? <BarsArrowUpIcon className='h-6 text-red-500'/> :
                <BarsArrowDownIcon className='h-6 text-red-500'/>}
        </div>
        <select className='px-1 border rounded' name="" id="flat-sort-field" value={props.sortValue}
                onChange={(event) => props.onSelect(event.target.value)}>
            {renderOptions()}
        </select>
    </div>
}
