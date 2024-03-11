import { useState, ReactNode} from 'react'
import PropTypes from "prop-types"

type Props = {
  children?: ReactNode,
  grid?: number,
  cols?: number,
  onCols: any,
}

export default function SwitchLayout({
  children,
  grid = 12,
  cols = 12,
  onCols
}: Props) {
  /**
   * param:
   * - grid num
   * - col num
   * 
   * return:
   * - col
   **/

  const gridUpdate = (val: any) => {
    console.log(val.target.value)
  }

  const gridChange = (val: any) => {
    console.log(val.target.value)
  }


  const gridNTimes = []
  for (let i=0; i<12; i++) {
    gridNTimes.push(<span key={i}>col-{i+1}</span>)
  }

  /*
    NOTE:
    for range slider to work. it take in 100 max value
    and increment by 25%.
    to get increment value.
    100 / {grid}
  */
  const gridIncrement = 100/grid

  const [l_cols, setl_cols] = useState(cols)

  const colsChange = (val: any) => {
    setl_cols(val.target.value)
    console.log(onCols)
    // look into emitting to parent
  }

  return (
    <div className="layout-switch grid grid-cols-3 gap-4">
      <span>
        cols-span-
      </span>
      <div>
        <input
          type="text"
          value={l_cols}
          onChange={colsChange}
          className="input w-full max-w-xs"
        />
      </div>
      <span>
        12 grid
      </span>

      {/** 
      <label
        className="col-span-1"
      >
        Layout:
      </label>

      <div
        className="col-span-10"
      >
        <input
          type="range"
          min={0}
          max="100"
          className="range range-xs"
          step={9}
          onChange={gridChange}
        />
        <div className="w-full flex justify-between text-xs px-2">
          { gridNTimes }
        </div>
      </div>

      <input
        type="text"
        value={grid}
        onChange={gridUpdate}
        className="input w-full max-w-xs"
      />
      */}
    </div>
  )
}
