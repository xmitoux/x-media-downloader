import { ArticleFetcher } from './article-fetcher';
import { FileSaver } from './file-saver';
import { PostParser } from './post-parser';
import { Scroller } from './scroller';

export class ImageScraper {
    private articleFetcher = new ArticleFetcher();
    private postParser = new PostParser();
    private fileSaver = new FileSaver();
    private scroller = new Scroller();
    private isRunning = false;

    async start(): Promise<void> {
        if (this.isRunning) return;
        this.isRunning = true;

        try {
            while (this.isRunning && !this.scroller.hasErrorMessage()) {
                const articles = this.articleFetcher.getUnprocessedArticles();

                for (const article of articles) {
                    const postData = this.postParser.parsePost(article);
                    if (postData) {
                        await this.fileSaver.saveImage(postData);
                        this.articleFetcher.markAsProcessed(article);
                    }
                }

                const hasNewContent = await this.scroller.scrollToBottom();
                if (!hasNewContent) break;
            }
        } catch (error) {
            console.error('Error during scraping:', error);
        } finally {
            this.isRunning = false;
        }
    }

    stop(): void {
        this.isRunning = false;
    }
}
