export class Scroller {
    private isScrolling = false;

    async scroll(): Promise<boolean> {
        if (this.isScrolling) return false;

        this.isScrolling = true;
        const originalHeight = document.documentElement.scrollHeight;
        const currentPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // 画面の半分くらいスクロール！
        const scrollAmount = Math.min(windowHeight * 0.5, 800);
        window.scrollTo({
            top: currentPosition + scrollAmount,
            behavior: 'smooth',
        });

        const newHeight = document.documentElement.scrollHeight;

        this.isScrolling = false;
        return newHeight > originalHeight;
    }

    hasErrorMessage(): boolean {
        const spans = document.querySelectorAll('span');
        const hasError = Array.from(spans).some(
            (span) => span.textContent?.includes('問題が発生しました') ?? false,
        );
        if (hasError) console.log('検索エラー！'); // デバッグログ追加！
        return hasError;
    }
}
