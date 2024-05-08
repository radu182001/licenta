import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { HttpParams } from '@angular/common/http';

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

  getFilesList(projectID: number, params?: any) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.webReqService.get(`/api/files/getFilesList/${projectID}`, { params: httpParams });
  }

  getAudioFilesList(projectID: number, params?: any) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.webReqService.get(`/api/files/getAudioFilesList/${projectID}`, { params: httpParams });
  }

  getArrangeFiles(projectID: number) {
    return this.webReqService.get(`/api/files/getArrangeFiles/${projectID}`);
  }

  addToArrangeFile(projectID: number, fileID: number) {
    console.log(fileID)
    return this.webReqService.post(`/api/files/addToArrangeFile/${projectID}`, {fileID: fileID});
  }

  getDawAudios(projectID: number) {
    return this.webReqService.get(`/api/files/getDawAudios/${projectID}`);
  }

  addToDawAudio(projectID: number, fileID: number, X: number, trackIndex: number) {
    return this.webReqService.post(`/api/files/addToDawAudio/${projectID}`, {fileID: fileID, X: X, trackIndex: trackIndex});
  }

  deleteDawAudio(id: number) {
    return this.webReqService.delete(`/api/files/deleteDawAudio/${id}`);
  }

  downloadFile(key: string) {
    return this.webReqService.get(`/api/files/${key}`);
  }

  deleteFile(key: string) {
    return this.webReqService.delete(`/api/files/${key}`);
  }

}
