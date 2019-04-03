import {Injectable} from '@angular/core';
import {JbUploadBlobModel} from './jb-upload-blob-model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ResourcesUtilsService} from '../resources-utils.service';
import {map} from 'rxjs/operators';
import {JbFileUploadResponse} from './jb-file-upload-response';
import {JbFileFindRequest} from './jb-file-find-request';
import {PaginationResponse} from '../pagination-response';
import {JbUploadedFileInfo} from './jb-uploaded-file-info';
import {JbFileInfo} from './jb-file-info';
import {JbUploadFileModel} from './jb-upload-file-model';

@Injectable({
    providedIn: 'root'
})
export class FileStoreService {

    upload(uploadData: JbUploadBlobModel | JbUploadFileModel): Observable<JbFileUploadResponse> {
        const formData = new FormData();
        const {metadata: meta} = uploadData;

        formData.append('context', uploadData.context);
        if (meta) {
            for (const metaKey in meta) {
                if (meta.hasOwnProperty(metaKey) && meta[metaKey]) {
                    formData.append(metaKey, '' + meta[metaKey]);
                }
            }
        }
        if (uploadData.hasOwnProperty('blob')) {
            const blobModel = uploadData as JbUploadBlobModel;
            formData.append(blobModel.context, blobModel.blob, blobModel.originalFilename);
        }
        if (uploadData.hasOwnProperty('file')) {
            const fileModel = uploadData as JbUploadFileModel;
            formData.append(fileModel.context, fileModel.file, fileModel.file.name);
        }
        return this.http.post<JbFileUploadResponse>(this.resourcesUtils.prependHostTo('/upload'), formData, {
                observe: 'response',
                reportProgress: false,
                responseType: 'json',
                withCredentials: true
            })
            .pipe(map(res => res.body));
    }

    find(fileFindRequest: JbFileFindRequest): Observable<PaginationResponse<JbFileInfo>> {
        return this.http.get<PaginationResponse<JbFileInfo>>(this.resourcesUtils.prependHostTo('/api/file/find'), {
                params: this.resourcesUtils.clearHttpParams(fileFindRequest),
                observe: 'response',
                reportProgress: false,
                responseType: 'json',
                withCredentials: true
            })
            .pipe(
                map(res => res.body),
                map((paginationResponse: PaginationResponse<JbFileInfo>) => {
                    paginationResponse.items = paginationResponse.items.map(item => {
                        item.uploadDate = item.uploadDate ? new Date(item.uploadDate) : item.uploadDate;
                        return item;
                    });
                    return paginationResponse;
                })
            );
    }

    jbUploadedFileInfo2JbFileFindInfo(inp: JbUploadedFileInfo): JbFileInfo {
        if (inp) {
            return {
                metadata: inp.metadata,
                uploadDate: inp.uploadDate,
                _id: inp.id,
                contentType: inp.contentType,
                filename: inp.filename,
                id: inp.id,
                length: inp.size,
                url: inp.url
            };
        }
        return null;
    }

    constructor(
        private http: HttpClient,
        private resourcesUtils: ResourcesUtilsService
    ) {
    }
}
