import { Observable, EventData } from '@nativescript/core';
import { LineChart } from '../charts/line-chart';

export interface ChartData {
    title: string;
    data: number[];
    labels: string[];
    color?: string;
    error?: string;
}

export class ChartContainer extends Observable {
    private chart: LineChart;
    private _data: ChartData;
    private _loading: boolean = false;
    private _error: string | null = null;

    constructor(data: ChartData) {
        super();
        this._data = data;
    }

    get data(): ChartData {
        return this._data;
    }

    get loading(): boolean {
        return this._loading;
    }

    get error(): string | null {
        return this._error;
    }

    get hasData(): boolean {
        return this._data.data.length > 0 && this._data.labels.length > 0;
    }

    onChartLoaded(args: EventData): void {
        if (!this.hasData) {
            this._error = 'No data available for this timeframe';
            this.notifyPropertyChange('error', this._error);
            return;
        }

        try {
            const canvas = args.object;
            this.chart = new LineChart(
                canvas,
                this._data.data,
                this._data.labels,
                this._data.color
            );
            this.chart.draw();
        } catch (error) {
            this._error = 'Error loading chart';
            this.notifyPropertyChange('error', this._error);
            console.error('Chart loading error:', error);
        }
    }

    async updateData(newData: number[], newLabels: string[]): Promise<void> {
        try {
            this._loading = true;
            this.notifyPropertyChange('loading', true);
            this._error = null;
            this.notifyPropertyChange('error', null);

            this._data.data = newData;
            this._data.labels = newLabels;

            if (this.chart && this.hasData) {
                this.chart.draw();
            }
        } catch (error) {
            this._error = 'Error updating chart data';
            this.notifyPropertyChange('error', this._error);
            console.error('Chart update error:', error);
        } finally {
            this._loading = false;
            this.notifyPropertyChange('loading', false);
        }
    }
}