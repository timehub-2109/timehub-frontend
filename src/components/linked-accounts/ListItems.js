import { Link } from "react-router-dom";

function ListItem({url, account}) {
    return (
      <li key={account.id} className={`hover:text-blue-600 ${account.textColor ? `${account.textColor}` : 'text-current'} w-full border-b px-3 py-3`}>
        <Link to={`${url}/${account.id}`}>
          <div className="flex items-center">
            <img className="w-4"
              src={`${process.env.PUBLIC_URL}/images/logos/${account.icon}`}
              alt={account.iconAlt} />
            <p className="flex-grow px-5">{account.name}</p>
            <img className="bg-gray-200 w-5 h-5 rounded-md"
              src={`${process.env.PUBLIC_URL}/images/icons/cheveron-right.svg`}
              alt="a next symbol" />
          </div>
        </Link>
      </li>
    )
}

export default ListItem;