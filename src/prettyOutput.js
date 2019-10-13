import { table } from 'table';

const prettyOutput = data => {
    const transformData = Object.entries(data);
    const output = [
        ['Branch name', 'Time']
    ].concat(transformData)
    console.log(table(output))
}

export default prettyOutput;