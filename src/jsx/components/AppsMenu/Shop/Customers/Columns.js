import {format} from 'date-fns';
import { ColumnFilter } from './ColumnFilter';
export const COLUMNS = [
	{
		Header : 'Company Name',
		Footer : 'Company Name',
		accessor: 'ContactName',
		Filter: ColumnFilter,
	},
	{
		Header : 'First Name',
		Footer : 'First Name',
		accessor: 'FirstName',
		Filter: ColumnFilter,
	},
	{
		Header : 'Last Name',
		Footer : 'Last Name',
		accessor: 'LastName',
		Filter: ColumnFilter,
	},
	{
		Header : 'Email Address',
		Footer : 'Email Address',
		accessor: 'EmailAddress',
		Filter: ColumnFilter,
	},
	{
		Header : 'Phone Number',
		Footer : 'Phone Number',
		accessor: 'PhoneNumber',
		Filter: ColumnFilter,
	},
];