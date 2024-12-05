import { Canvas, GestureTypes, GestureEventData, PanGestureEventData } from '@nativescript/core';

export interface ChartTooltip {
    x: number;
    y: number;
    value: number;
    label: string;
}

export interface DataSeries {
    label: string;
    data: number[];
    color: string;
    visible: boolean;
}

export class LineChart {
    private canvas: Canvas;
    private ctx: CanvasRenderingContext2D;
    private series: DataSeries[];
    private labels: string[];
    private tooltip: ChartTooltip | null = null;
    private points: Map<string, Array<{x: number; y: number; value: number; label: string}>> = new Map();
    private scale: number = 1;
    private offset: { x: number; y: number } = { x: 0, y: 0 };
    private isDragging: boolean = false;
    private lastPanPoint: { x: number; y: number } | null = null;

    constructor(canvas: Canvas, series: DataSeries[], labels: string[]) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.series = series;
        this.labels = labels;

        // Add gesture event listeners
        this.canvas.on(GestureTypes.touch, this.handleTouch.bind(this));
        this.canvas.on(GestureTypes.pan, this.handlePan.bind(this));
        this.canvas.on(GestureTypes.pinch, this.handlePinch.bind(this));
    }

    private handleTouch(args: GestureEventData): void {
        const { x, y } = args.getX(), args.getY();
        this.findAndShowTooltip(x, y);
    }

    private handlePan(args: PanGestureEventData): void {
        if (args.state === 1) { // Pan started
            this.isDragging = true;
            this.lastPanPoint = { x: args.deltaX, y: args.deltaY };
        } else if (args.state === 2) { // Panning
            if (this.lastPanPoint) {
                const deltaX = args.deltaX - this.lastPanPoint.x;
                const deltaY = args.deltaY - this.lastPanPoint.y;
                this.offset.x += deltaX;
                this.offset.y += deltaY;
                this.lastPanPoint = { x: args.deltaX, y: args.deltaY };
                this.draw();
            }
        } else if (args.state === 3) { // Pan ended
            this.isDragging = false;
            this.lastPanPoint = null;
        }
    }

    private handlePinch(args: any): void {
        const scale = args.scale;
        const newScale = this.scale * scale;
        if (newScale >= 0.5 && newScale <= 3) {
            this.scale = newScale;
            this.draw();
        }
    }

    private findAndShowTooltip(touchX: number, touchY: number): void {
        let closestPoint = null;
        let minDistance = Infinity;

        this.series.forEach(series => {
            if (!series.visible) return;
            
            const seriesPoints = this.points.get(series.label) || [];
            seriesPoints.forEach(point => {
                const distance = Math.sqrt(
                    Math.pow(touchX - point.x, 2) + Math.pow(touchY - point.y, 2)
                );
                if (distance < minDistance && distance < 20) {
                    minDistance = distance;
                    closestPoint = { ...point, seriesLabel: series.label };
                }
            });
        });

        if (closestPoint) {
            this.tooltip = {
                x: closestPoint.x,
                y: closestPoint.y,
                value: closestPoint.value,
                label: `${closestPoint.seriesLabel}: ${closestPoint.label}`
            };
        } else {
            this.tooltip = null;
        }

        this.draw();
    }

    toggleSeries(seriesLabel: string): void {
        const series = this.series.find(s => s.label === seriesLabel);
        if (series) {
            series.visible = !series.visible;
            this.draw();
        }
    }

    draw(): void {
        const { width, height } = this.canvas;
        const padding = 20;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Calculate scales
        const maxValue = Math.max(...this.series.reduce((acc, series) => 
            series.visible ? [...acc, ...series.data] : acc, [] as number[]));
        const xStep = (width - padding * 2) / (this.labels.length - 1);
        const yScale = (height - padding * 2) / maxValue;

        // Apply zoom and pan transformations
        this.ctx.save();
        this.ctx.translate(this.offset.x, this.offset.y);
        this.ctx.scale(this.scale, this.scale);

        // Draw grid
        this.drawGrid(width, height, padding, maxValue);

        // Draw each visible series
        this.series.forEach(series => {
            if (!series.visible) return;
            this.drawSeries(series, width, height, padding, xStep, yScale);
        });

        // Draw labels
        this.drawLabels(width, height, padding, xStep);

        // Restore canvas state
        this.ctx.restore();

        // Draw tooltip if active (outside of transformation)
        if (this.tooltip) {
            this.drawTooltip(this.tooltip);
        }
    }

    private drawSeries(series: DataSeries, width: number, height: number, padding: number, xStep: number, yScale: number): void {
        const points: Array<{x: number; y: number; value: number; label: string}> = [];

        // Draw line
        this.ctx.beginPath();
        this.ctx.strokeStyle = series.color;
        this.ctx.lineWidth = 2;

        series.data.forEach((value, index) => {
            const x = padding + (index * xStep);
            const y = height - (padding + value * yScale);
            
            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

            points.push({
                x,
                y,
                value,
                label: this.labels[index]
            });
        });

        this.ctx.stroke();

        // Store points for interaction
        this.points.set(series.label, points);

        // Draw points
        points.forEach(point => {
            this.ctx.beginPath();
            this.ctx.fillStyle = series.color;
            this.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    // ... (rest of the existing methods remain the same)
}