export class FileSaver {
    async saveImage(postData: PostData): Promise<void> {
        try {
            const filename = this.generateFilename(postData);
            const response = await fetch(postData.imageUrl);
            const blob = await response.blob();

            // ブラウザの標準APIでダウンロード
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url); // メモリリーク防止！
        } catch (error) {
            console.error('Error saving image:', error);
            throw error;
        }
    }

    private generateFilename(postData: PostData): string {
        const timestamp = postData.datetime
            .toISOString()
            .replace(/[-:]/g, '')
            .split('.')[0]
            .replace('T', '_');

        return `${timestamp}-${postData.originalFilename}`;
    }
}
