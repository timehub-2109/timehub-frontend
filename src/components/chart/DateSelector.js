function DateSelector(props) {
  return (
    <div className="flex text-gray-800 font-light text-xl font gap-2 justify-center items-center">
      <button onClick={e => props.handlePrev(e)}>
        <img className="box-content w-5 p-1 hover:bg-gray-200 rounded-sm"
             alt="left button"
             src={process.env.PUBLIC_URL + '/images/icons/cheveron-left.svg'} />
      </button>
      <h3>{props.chartTitle}</h3>
      <button onClick={e => props.handleNext(e)}>
        <img className="box-content w-5 p-1 hover:bg-gray-200 rounded-sm"
             alt="right button"
             src={process.env.PUBLIC_URL + '/images/icons/cheveron-right.svg'} />
      </button>
    </div>
  );
}

export default DateSelector;