export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
}

export function formatPercentage(value: number): string {
    return `${(value * 100).toFixed(1)}%`;
}

export function formatNumber(value: number): string {
    return new Intl.NumberFormat('es-MX').format(value);
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

export function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
}