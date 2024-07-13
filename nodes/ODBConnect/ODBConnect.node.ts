import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

const ADODB = require("odbc");

export class ODBConnect implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'ODBConnect',
        name: 'odbconnect',
        icon: 'file:odbconnect.svg',
        group: ['transform'],
        version: 1,
        description: 'Fetches a result set from a ODBC data source based on query when webhook is triggered',
        defaults: {
            name: 'ODBConnect',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [],
        properties: [
            {
                displayName: 'DSN',
                name: 'dsn',
                type: 'string',
                default: '',
                placeholder: 'Enter DSN',
                required: true,
            },
            {
                displayName: 'Password',
                name: 'password',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                placeholder: 'Enter Password',
                required: true,
            },
            {
                displayName: 'User ID',
                name: 'userId',
                type: 'string',
                default: '',
                placeholder: 'Enter User ID',
                required: false,
            },
            {
                displayName: 'Query',
                name: 'query',
                type: 'string',
                default: '',
                placeholder: 'Enter SQL Query',
                required: true,
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const dsn = this.getNodeParameter("dsn",0,'') as string;
        const password = this.getNodeParameter('password',1) as string;
        const userId = this.getNodeParameter('userId',2) as string | undefined;
        const query = this.getNodeParameter('query',3) as string;

        const connectionString = `DSN=${dsn};PWD=${password};${userId ? `UID=${userId};` : ''}`;

        try {
            const connection = await ADODB.connect(connectionString);
            const result = await connection.query(query);
            result.forEach((record: any) => {
              if (record.ID && record.Photo) {
                // Convert the binary data to Buffer
                const buffer = Buffer.from(record.Photo);
                const base64String = buffer.toString("base64");
                record.Photo = base64String;
              }
            });
            return this.prepareOutputData(this.helpers.returnJsonArray(result));
        } catch (error) {
            throw new Error('Failed to execute query.');
        }
    }
}
