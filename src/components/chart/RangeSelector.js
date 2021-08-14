function RangeSelector(props) {
  let options = [
    {
      name: 'Week',
      handler: props.handleRangeToWeek,
    },
    {
      name: 'Day',
      handler: props.handleRangeToDay,
    },
  ];

  let buttons = options.map((option, idx) => {
    let activeName = props.isWeekly ? 'Week' : 'Day';
    let activeStyles = 'bg-gray-500 text-white border-0';
    let inactiveStyles = 'bg-gray-400 text-gray-200 border-gray-200';

    return (
      <button key={`range_Selector_${idx}`} className={`${activeName === option.name ? activeStyles : inactiveStyles} focus:outline-none rounded-sm px-2`}
        onClick={e => option.handler(e)}>
        {option.name}
      </button>
    )
  });

  return (
    <div className="flex gap-1 justify-end text-xs">
      <p className="font-light mr-px">Show by:</p>
      {buttons}
    </div>
  );
}

export default RangeSelector;