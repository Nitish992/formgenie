import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Response {
    [key: string]: any;
}

interface Field {
    label: string;
    type: "Text" | "Dropdown" | "Multiple Choice" | "Checkbox";
}

interface ResponseChartProps {
    responses: Response[];
    fields: Field[];
}

const ResponseChart: React.FC<ResponseChartProps> = ({ responses, fields }) => {
    const textResponses: Record<string, number> = {};
    const dropdownResponses: Record<string, number> = {};
    const multipleChoiceResponses: Record<string, number> = {};
    const checkboxResponses: Record<string, number> = {};

    responses.forEach((response) => {
        fields.forEach((field) => {
            switch (field.type) {
                case "Text":
                    textResponses[response[field.label]] = (textResponses[response[field.label]] || 0) + 1;
                    break;
                case "Dropdown":
                    dropdownResponses[response[field.label]] = (dropdownResponses[response[field.label]] || 0) + 1;
                    break;
                case "Multiple Choice":
                    Object.entries(response[field.label]).forEach(([option, isSelected]) => {
                        if (isSelected) {
                            multipleChoiceResponses[option] = (multipleChoiceResponses[option] || 0) + 1;
                        }
                    });
                    break;
                case "Checkbox":
                    checkboxResponses[field.label] = (checkboxResponses[field.label] || 0) + (response[field.label] ? 1 : 0);
                    break;
            }
        });
    });

    return (
        <div className="grid grid-cols-1 gap-4">
            {Object.keys(textResponses).length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Text Responses</h3>
                    <Bar data={{
                        labels: Object.keys(textResponses),
                        datasets: [{
                            label: 'Count',
                            data: Object.values(textResponses),
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        }]
                    }} />
                </div>
            )}
            {Object.keys(dropdownResponses).length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Dropdown Responses</h3>
                    <Bar data={{
                        labels: Object.keys(dropdownResponses),
                        datasets: [{
                            label: 'Count',
                            data: Object.values(dropdownResponses),
                            backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        }]
                    }} />
                </div>
            )}
            {Object.keys(multipleChoiceResponses).length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Multiple Choice Responses</h3>
                    <Bar data={{
                        labels: Object.keys(multipleChoiceResponses),
                        datasets: [{
                            label: 'Count',
                            data: Object.values(multipleChoiceResponses),
                            backgroundColor: 'rgba(255, 159, 64, 0.5)',
                        }]
                    }} />
                </div>
            )}
            {Object.keys(checkboxResponses).length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Checkbox Responses</h3>
                    <Bar data={{
                        labels: Object.keys(checkboxResponses),
                        datasets: [{
                            label: 'Count',
                            data: Object.values(checkboxResponses),
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }]
                    }} />
                </div>
            )}
        </div>
    );
};

export default ResponseChart;
