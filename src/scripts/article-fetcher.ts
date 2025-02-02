export class ArticleFetcher {
    private processedDates: Set<string> = new Set();

    getNextUnprocessedArticle(): HTMLElement | null {
        const articles = Array.from(document.querySelectorAll('article'));
        return articles.find((article) => !this.isProcessed(article)) || null;
    }

    private isProcessed(article: HTMLElement): boolean {
        const time = article.querySelector('time');
        if (!time?.getAttribute('datetime')) return true;
        return this.processedDates.has(time.getAttribute('datetime')!);
    }

    markAsProcessed(article: HTMLElement): void {
        const time = article.querySelector('time');
        if (time?.getAttribute('datetime')) {
            this.processedDates.add(time.getAttribute('datetime')!);
        }
    }
}
