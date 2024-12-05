import { Observable } from '@nativescript/core';
import { BusinessService } from '../../../services/business.service';
import { MetricsCard } from '../../../components/business/metrics-card';
import { ChartContainer } from '../../../components/business/chart-container';
import { ActivityList } from '../../../components/business/activity-list';
import type { BusinessMetrics, BusinessAnalytics } from '../../../models/business.model';

export class BusinessDashboardViewModel extends Observable {
    private businessService: BusinessService;
    
    activeUsers: MetricsCard;
    rewards: MetricsCard;
    spending: MetricsCard;
    retention: MetricsCard;
    customerChart: ChartContainer;
    revenueChart: ChartContainer;
    activityList: ActivityList;
    timeframe: 'week' | 'month' = 'week';

    constructor() {
        super();
        this.businessService = new BusinessService();
        this.initializeComponents();
        this.loadDashboardData();
    }

    private initializeComponents(): void {
        // Initialize with placeholder data until real data is loaded
        this.activeUsers = new MetricsCard({
            label: 'Active Users',
            value: 0,
            change: 0
        });

        this.rewards = new MetricsCard({
            label: 'Rewards Redeemed',
            value: 0,
            change: 0
        });

        this.spending = new MetricsCard({
            label: 'Avg. Spend/Visit',
            value: 0,
            change: 0,
            format: 'currency'
        });

        this.retention = new MetricsCard({
            label: 'Retention Rate',
            value: 0,
            change: 0,
            format: 'percentage'
        });

        this.customerChart = new ChartContainer({
            title: 'Customer Growth',
            data: [],
            labels: []
        });

        this.revenueChart = new ChartContainer({
            title: 'Revenue Trend',
            data: [],
            labels: [],
            color: '#059669'
        });

        this.activityList = new ActivityList([]);
    }

    async loadDashboardData(): Promise<void> {
        try {
            const [metrics, analytics, activity] = await Promise.all([
                this.businessService.getMetrics(),
                this.businessService.getAnalytics(),
                this.businessService.getRecentActivity()
            ]);

            this.updateMetrics(metrics);
            this.updateCharts(analytics);
            this.updateActivity(activity);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            // TODO: Show error message
        }
    }

    private updateMetrics(metrics: BusinessMetrics): void {
        this.activeUsers = new MetricsCard({
            label: 'Active Users',
            value: metrics.activeUsers,
            change: 15 // Mock data
        });

        this.rewards = new MetricsCard({
            label: 'Rewards Redeemed',
            value: metrics.rewardsRedeemed,
            change: 8 // Mock data
        });

        this.spending = new MetricsCard({
            label: 'Avg. Spend/Visit',
            value: metrics.averageSpendPerVisit,
            change: 12, // Mock data
            format: 'currency'
        });

        this.retention = new MetricsCard({
            label: 'Retention Rate',
            value: metrics.customerRetentionRate,
            change: -2, // Mock data
            format: 'percentage'
        });
    }

    private updateCharts(analytics: BusinessAnalytics): void {
        this.customerChart.updateData(
            analytics.customerGrowth,
            analytics.timestamps
        );

        this.revenueChart.updateData(
            analytics.revenue,
            analytics.timestamps
        );
    }

    private updateActivity(activity: any[]): void {
        this.activityList = new ActivityList(activity);
    }

    onWeeklyView(): void {
        this.set('timeframe', 'week');
        // TODO: Load weekly data
    }

    onMonthlyView(): void {
        this.set('timeframe', 'month');
        // TODO: Load monthly data
    }
}