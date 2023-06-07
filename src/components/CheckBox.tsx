import {v4 as uuidv4} from "uuid";

function CheckBox(props: { checked: boolean, label?: string, onChange?:(checked)=>void }) {
    const uuid = uuidv4().slice(0, 5);
    const checkbox = <input id={uuid} type="checkbox" checked={props.checked} onChange={props.onChange}/>
    if (props.label)
        return <div className='flex gap-1 items-center'>
            {checkbox}
            <label htmlFor={uuid}>{props.label}</label>
        </div>
    else
        return checkbox
}

export default CheckBox