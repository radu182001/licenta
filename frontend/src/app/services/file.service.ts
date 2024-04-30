import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private webReqService: WebRequestService) { }

  uploadFile(projectID: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);  // 'file' is the key that Multer is looking for

    return this.webReqService.post(`/api/files/uploadFile/${projectID}`, formData);
  }

  getFilesList(projectID: number) {
    return this.webReqService.get(`/api/files/getFilesList/${projectID}`);
  }

  downloadFile(key: string) {
    return this.webReqService.get(`/api/files/${key}`);
  }

  deleteFile(key: string) {
    return this.webReqService.delete(`/api/files/${key}`);
  }

}
