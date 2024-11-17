type JSONDict = { [key: string]: any };

export class Media {
    id: string;
    caption?: string;
    checksum?: string;
    description?: string;
    thumbnailUrl?: string;
    sourceUri?: string;
    mediaType?: string;
    mimeType?: string;
    fileName?: string;
    fileSize?: number;
    typeName?: string;
    ownerId?: string;
    ownerType?: string;
    downloadUrl?: string;
    url?: string;
    premium?: boolean;

    constructor(
        id: string,
        caption?: string,
        checksum?: string,
        description?: string,
        thumbnailUrl?: string,
        sourceUri?: string,
        mediaType?: string,
        mimeType?: string,
        fileName?: string,
        fileSize?: number,
        typeName?: string,
        ownerId?: string,
        ownerType?: string,
        downloadUrl?: string,
        url?: string,
        premium?: boolean
    ) {
        this.id = id;
        this.caption = caption;
        this.checksum = checksum;
        this.description = description;
        this.thumbnailUrl = thumbnailUrl;
        this.sourceUri = sourceUri;
        this.mediaType = mediaType;
        this.mimeType = mimeType;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.typeName = typeName;
        this.ownerId = ownerId;
        this.ownerType = ownerType;
        this.downloadUrl = downloadUrl;
        this.url = url;
        this.premium = premium;
    }

    static parseFromData(data: JSONDict): Media {
        return new Media(
            data['id'],
            data['caption'],
            data['checksum'],
            data['description'],
            data['thumbnailUrl'],
            data['sourceUri'],
            data['mediaType'],
            data['mimeType'],
            data['fileName'],
            data['fileSize'],
            data['typeName'],
            data['ownerId'],
            data['ownerType'],
            data['downloadUrl'],
            data['url'],
            data['premium']
        );
    }

    convertToRequest(): JSONDict {
        const fields: { [key: string]: any } = {
            "id": this.id,
            "caption": this.caption,
            "checksum": this.checksum,
            "description": this.description,
            "thumbnailUrl": this.thumbnailUrl,
            "sourceUri": this.sourceUri,
            "mediaType": this.mediaType,
            "mimeType": this.mimeType,
            "fileName": this.fileName,
            "fileSize": this.fileSize,
            "typeName": this.typeName,
            "ownerId": this.ownerId,
            "ownerType": this.ownerType,
            "downloadUrl": this.downloadUrl,
            "url": this.url,
            "premium": this.premium
        };

        // Filter out undefined values
        return Object.fromEntries(
            Object.entries(fields).filter(([_, value]) => value !== undefined)
        );
    }
}

export interface UploadMediaResponse {
  timestamp: number;
  public: boolean;
  file_name: string;
  file_size: number;
  backup_channel: number;
  backup_message_id: number;
  file_id: string;
  fileId: string;
  status: string;
  downloadUrl: string;
}