export class PostParser {
    parsePost(article: HTMLElement): PostData | null {
        try {
            const time = article.querySelector('time');
            const img = article.querySelector('img[alt="画像"]');

            if (!time?.getAttribute('datetime') || !img?.getAttribute('src')) {
                return null;
            }

            const datetime = new Date(time.getAttribute('datetime')!);
            const imageUrl = this.convertToLargeImage(img.getAttribute('src')!);
            const originalFilename = this.extractOriginalFilename(imageUrl);

            return { datetime, imageUrl, originalFilename };
        } catch (error) {
            console.error('Error parsing post:', error);
            return null;
        }
    }

    private convertToLargeImage(url: string): string {
        return url.replace(/name=\w+$/, 'name=large');
    }

    private extractOriginalFilename(url: string): string {
        const match = url.match(/media\/([^?]+)/);
        return match ? match[1] : '';
    }
}
