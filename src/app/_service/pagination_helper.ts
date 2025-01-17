import {HttpClient, HttpParams} from "@angular/common/http";
import {PaginationResult} from "../_model/pagination";
import {map} from "rxjs";

export function getPaginationResult<T>(url: string, params: HttpParams, http: HttpClient) {
  const paginatedResult: PaginationResult<T> = new PaginationResult<T>;
  return http.get<T>(url, {observe: 'response', params}).pipe(
    map(response => {
      if (response.body) {
        paginatedResult.result = response.body;
      }
      const pagination = response.headers.get('Pagination');
      if (pagination) {
        paginatedResult.pagination = JSON.parse(pagination);
      }
      return paginatedResult
    })
  )
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();
  params = params.append('pageNumber', pageNumber);
  params = params.append('pageSize', pageSize);
  return params;
}
