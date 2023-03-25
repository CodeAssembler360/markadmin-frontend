import {format} from 'date-fns';
import moment from 'moment';
export const COLUMNS = [
	{
		Header : 'Company Name',
		Footer : 'Company Name',
		accessor: 'ContactName',
	},
	{
		Header : 'First Name',
		Footer : 'First Name',
		accessor: 'FirstName',
	},
	{
		Header : 'Last Name',
		Footer : 'Last Name',
		accessor: 'LastName',
	},
	{
		Header : 'Email Address',
		Footer : 'Email Address',
		accessor: 'EmailAddress',
	},
	{
		Header : 'Phone Number',
		Footer : 'Phone Number',
		accessor: 'PhoneNumber',
	},
];


export const COLUMN = [
	{
		Header : 'Company Name',
		Footer : 'Company Name',
		accessor: 'ContactName',
	},
	{
		Header : 'Date',
		Footer : 'Date',
		accessor: 'date',
		Cell: ({ value }) => {return moment(value).format( 'DD-MM-YYYY')},
	},
	{
		Header : 'Customer Material',
		Footer : 'Customer Material',
		accessor: 'Customer_Provider',
	},
	{
		Header : 'Active Ingredient',
		Footer : 'Active Ingredient',
		accessor: 'active_ingredient',
	},
	{
		Header : 'Total Bar',
		Footer : 'Total Bar',
		accessor: 'totalBar',
	},{
		Header : 'Status',
		Footer : 'Status',
		accessor: 'status',
	},
];