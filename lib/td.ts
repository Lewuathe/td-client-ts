import * as request from 'request-promise-native';
import * as qs from 'querystring';
import {
  CreateDatabaseResponse, CreateTableResponse,
  DeleteDatabaseResponse, DeleteTableResponse, Job, KillResponse,
  ListDatabasesResponse,
  ListJobsResponse,
  ListTablesResponse
} from './model';

export class TD {
  baseUri: string;
  private readonly apikey: string;

  constructor(apikey: string) {
    this.baseUri = 'http://api.treasuredata.com';
    this.apikey = apikey;
  }

  async listDatabases(): Promise<ListDatabasesResponse> {
    return this.getRequest('/v3/database/list')
      .then(value => {
        return ListDatabasesResponse.fromJson(value);
      });
  }

  async createDatabase(db: string): Promise<CreateDatabaseResponse> {
    return this.postRequest(`/v3/database/create/${qs.escape(db)}`)
      .then(value => {
        return CreateDatabaseResponse.fromJson(value);
      });
  }

  async deleteDatabase(db: string): Promise<DeleteDatabaseResponse> {
    return this.postRequest(`/v3/database/delete/${qs.escape(db)}`)
      .then(value => {
        return DeleteDatabaseResponse.fromJson(value);
      });
  }

  async listJobs(): Promise<ListJobsResponse> {
    return this.getRequest('/v3/job/list')
      .then(value => {
        return ListJobsResponse.fromJson(value);
      });
  }

  async listTables(db: string): Promise<ListTablesResponse> {
    return this.getRequest(`/v3/table/list/${qs.escape(db)}`)
      .then(value => {
        return ListTablesResponse.fromJson(value);
      });
  }

  async createTable(db: string, table: string, type: string): Promise<CreateTableResponse> {
    return this.postRequest(`/v3/table/create/${qs.escape(db)}/${qs.escape(table)}/${qs.escape(type)}`)
      .then(value => {
        return CreateTableResponse.fromJson(value);
      });
  }

  async deleteTable(db: string, table: string): Promise<DeleteTableResponse> {
    return this.postRequest(`/v3/table/delete/${qs.escape(db)}/${qs.escape(table)}`)
      .then(value => {
        return DeleteTableResponse.fromJson(value);
      });
  }

  async showJob(jobId: string): Promise<Job> {
    return this.getRequest(`/v3/job/show/${qs.escape(jobId)}`)
      .then(value => {
        return Job.fromJson(value);
      });
  }

  async kill(jobId: string): Promise<KillResponse> {
    return this.postRequest(`/v3/job/kill/${qs.escape(jobId)}`)
      .then(value => {
        return KillResponse.fromJson(value);
      });
  }

  private async getRequest(path: string): Promise<string> {
    const options = {
      uri: `${this.baseUri}${path}`,
      headers: {
        'Authorization': `TD1 ${this.apikey}`
      }
    };

    return request.get(options);
  }

  private async postRequest(path: string): Promise<string> {
    const options = {
      uri: `${this.baseUri}${path}`,
      headers: {
        'Authorization': `TD1 ${this.apikey}`
      }
    };

    return request.post(options);
  }

}