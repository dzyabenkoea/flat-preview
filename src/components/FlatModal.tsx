import {XMarkIcon} from "@heroicons/react/24/outline";

function FlatModal(props: any) {
    if (props.flatData) {
        return <div
            className='absolute w-full h-full left-0 top-0 flex items-center justify-center bg-black/10 flex-col gap-2 sm:p-5'
            onClick={props.onClose}>
            <div className='flex flex-col items-center max-w-[75ch] gap-2'>
                <div
                    className='hidden sm:block rounded-full bg-white hover:bg-gray-50 p-3 cursor-pointer self-end shadow-xl'
                    onClick={props.onClose}>
                    <XMarkIcon className='h-6'/>
                </div>
                <div className='bg-white rounded p-8 flex flex-col sm:grid sm:grid-cols-2 sm:gap-4 shadow-xl'
                     onClick={(event) => {
                         event.stopPropagation()
                     }}>
                    <div className='self-end sm:hidden cursor-pointer p-2 rounded-full border border-red-500/10 hover:bg-gray-50' onClick={props.onClose}>
                        <XMarkIcon className='h-6 text-red-500'/>
                    </div>
                    <div><img src={props.flatData.layout_image} alt=""/></div>
                    <div className="flex flex-col gap-4">
                        <h1 className='font-bold text-2xl'>Квартира
                            №{props.flatData.id}</h1>
                        <ul className='flex flex-col'>
                            <li className='flex justify-between'>
                                <div className='font-medium'>Общая площадь:</div>
                                <div>{props.flatData.area_total} кв.м</div>
                            </li>
                            <li className='flex justify-between'>
                                <div className='font-medium'>Жилая площадь:</div>
                                <div>{props.flatData.area_live} кв.м</div>
                            </li>
                            <li className='flex justify-between'>
                                <div className='font-medium'>Площадь кухни:</div>
                                <div>{props.flatData.area_kitchen} кв.м</div>
                            </li>
                            <li className='flex justify-between'>
                                <div className='font-medium'>Комнаты:</div>
                                <div>{props.flatData.rooms}</div>
                            </li>
                            <li className='flex justify-between'>
                                <div className='font-medium'>Порядковый номер на этаже:</div>
                                <div>{props.flatData.pos_on_floor}</div>
                            </li>
                            <li className='flex justify-between'>
                                <div className='font-medium'>Этаж:</div>
                                <div>{props.flatData.floor}</div>
                            </li>
                        </ul>
                        <div className='flex justify-between'>
                            <div className='text-xl font-medium'>Цена:</div>
                            <div className='text-2xl text-red-500 font-semibold'>{props.flatData.price} ₽</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    return null
}

export default FlatModal