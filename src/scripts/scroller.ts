export class Scroller {
    private isScrolling = false;

    async scrollToBottom(): Promise<boolean> {
        if (this.isScrolling) return false;

        this.isScrolling = true;
        const originalHeight = document.documentElement.scrollHeight;

        window.scrollTo(0, document.documentElement.scrollHeight);

        // 新しいコンテンツが読み込まれるのを待つ
        await new Promise((resolve) => setTimeout(resolve, 2000));

        this.isScrolling = false;

        // スクロール後に新しいコンテンツが追加されたかチェック
        return document.documentElement.scrollHeight > originalHeight;
    }

    hasErrorMessage(): boolean {
        const spans = document.querySelectorAll('span');
        return Array.from(spans).some(
            (span) => span.textContent?.includes('問題が発生しました') ?? false,
        );
    }
}
