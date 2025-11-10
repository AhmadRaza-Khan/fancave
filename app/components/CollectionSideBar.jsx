import React from 'react'

const CollectionSideBar = () => {
  return (
    <ul className="menu bg-white rounded-box w-[30vw] px-16">
        <li className='text-2xl pl-3'>Filter</li>
        <li className='my-5'>
            <details close>
            <summary className='cursor-pointer hover:text-gray-500'>Availability</summary>
            <ul>
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
            </ul>
            </details>
        </li>

        <li className='my-5'> 
            <details close>
            <summary className='cursor-pointer hover:text-gray-500'>Product type</summary>
            <ul>
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
            </ul>
            </details>
        </li>

        <li className='my-5'>
            <details close>
            <summary className='cursor-pointer hover:text-gray-500'>Price</summary>
            <ul>
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
            </ul>
            </details>
        </li>

        <li className='my-5'>
            <details close>
            <summary className='cursor-pointer hover:text-gray-500'>Brand</summary>
            <ul>
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
            </ul>
            </details>
        </li>
    </ul>
  )
}

export default CollectionSideBar