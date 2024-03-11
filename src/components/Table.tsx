import React from 'react'

/**
  * The column available settings for table.
  * @example
  * columns: [
  *  {
  *    name: '', // readable label of object property from API respond object
  *    field: '', // name of object property from API respond object
  *    align: 'text-center' || 'text-right',
  *    sortable: true || false,
  *    customButtons: [
  *      {
  *        label: '',
  *        iconClass: '', // class name of icon
  *        iconSvg: ``, // tempalte literal value, ref heroicons.com
  *        emit: ''
  *      }
  *    ],
  *    asLink: true || false, // field name of row.data we want to be as link value
  *    asButton: '', // class name style of button
  *    selectAll: true || false,
  *    asMultipleButtons: true || false,
  *    // accepts Array as value (row[{property_name}]) with object format of...
  *    // [
  *    //  {
  *    //    label: '',
  *    //    class: '', // usually style associated with button
  *    //    emit: ''
  *    //   }
  *    // ]
  *  }
  * ]
  */

type Props = {
  children?: React.ReactNode,
  columns?: any[],
  rows?: any[]
}

const Table = ({
  children,
  columns = [],
  rows = [],
}: Props) => {
  /*
    TODO:
    - Plugin in Faker.js as State
    --- Read about about global state management in react using useContext and useReducer Hooks
    - Move Table features from vue to react
    --- Build a way to interactively load data (user gets to choose the data amount, fields)
    --- Build a way to interact with Features  (user gets to toggle features and see it happen in realtime)
    - Apply Unit testing. Jest or check out what next,js has to offer.
  */

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>

      { children }
    </div>
  )
}

export default Table