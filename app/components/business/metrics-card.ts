import { Observable } from '@nativescript/core';

export interface MetricsCardData {
    label: string;
    value: number | string;
    change: number;
    format?: 'number' | 'currency' | 'percentage';
}

export class MetricsCard extends Observable {
    private data: MetricsCardData;

    constructor(data: MetricsCardData) {
        super();
        this.data = data;
    }

    get formattedValue(): string {
        switch (this.data.format) {
            case 'currency':
                return new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN'
                }).format(Number(this.data.value));
            case 'percentage':
                return `${Number(this.data.value) * 100}%`;
            default:
                return String(this.data.value);
        }
    }

    get changeClass(): string {
        return this.data.change >= 0 ? 'text-green-600' : 'text-red-600';
    }

    get changeText(): string {
        return `${this.data.change}%`;
    }
}