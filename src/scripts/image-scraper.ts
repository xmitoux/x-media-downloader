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
    private maxSaveCount = 0;
    private saveCount = 0;

    constructor(maxSaveCount: number) {
        this.maxSaveCount = maxSaveCount === 0 ? Infinity : maxSaveCount;
    }

    async start(): Promise<void> {
        if (this.isRunning) return;
        this.isRunning = true;

        try {
            while (
                this.isRunning &&
                !this.scroller.hasErrorMessage() &&
                this.saveCount < this.maxSaveCount
            ) {
                // まず今表示されてる投稿を1個見つける！
                const article = this.articleFetcher.getNextUnprocessedArticle();

                if (article) {
                    console.log('未処理の投稿見つけた！');
                    const postData = this.postParser.parsePost(article);
                    if (postData) {
                        // 画像保存！
                        console.log('画像保存するよ:', postData.imageUrl);
                        await this.fileSaver.saveImage(postData);
                        this.saveCount++;

                        // 投稿を保存済み扱いに！
                        this.articleFetcher.markAsProcessed(article);

                        // 1個処理したらすぐスクロール！新しいのを表示させる！
                        console.log('1枚保存したからスクロールするよ！');
                        await this.scroller.scroll();
                    }
                } else {
                    // 画面内に未処理の投稿が全然なかったら追加でスクロール！
                    console.log('未処理の投稿なし！スクロールするよ！');
                    await this.scroller.scroll();
                }

                // ちょっと待ってから次！
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
        } catch (error) {
            console.error('エラー発生:', error);
        } finally {
            this.stop();
            console.log('処理終了！');
        }
    }

    stop(): void {
        this.isRunning = false;
    }
}
