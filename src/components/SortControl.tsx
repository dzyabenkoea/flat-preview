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

    return <div className='flex items-center'>
        <div className='cursor-pointer' onClick={() => props.onSortDirectionChange(!props.sortAscending)}>
            {props.sortAscending ? <BarsArrowUpIcon className='h-6 text-red-500'/> :
                <BarsArrowDownIcon className='h-6 text-red-500'/>}
        </div>
        <div>
            <select name="" id="flat-sort-field" value={props.sortValue}
                    onChange={(event) => props.onSelect(event.target.value)}>
                {renderOptions()}
            </select>
        </div>
    </div>
}
