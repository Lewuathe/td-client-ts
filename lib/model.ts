class Database {
  name: string;
  createdAt: string;
  updatedAt: string;
  count: number;
  organization: number;
  permission: string;
  deletedProtected: boolean;

  constructor(name: string, createdAt: string, updatedAt: string,
              count: number, organization: number, permission: string,
              deletedProtected: boolean) {
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.count = count;
    this.organization = organization;
    this.permission = permission;
    this.deletedProtected = deletedProtected;
  }
}

/**
 * Represents a returned value from list databases requests.
 */
export class ListDatabasesResponse {
  databases: Database[];

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);

    /* tslint:disable-next-line:no-any */
    const databases = json['databases'].map((d: any) => {
      return new Database(d.name, d.created_at, d.updated_at, d.count,
        d.organization, d.permission, d.deleted_protecte);
    });
    return new ListDatabasesResponse(databases);
  }

  constructor(databases: Database[]) {
    this.databases = databases;
  }
}

export class CreateDatabaseResponse {
  database: string;

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);
    return new CreateDatabaseResponse(json['database']);
  }

  constructor(database: string) {
    this.database = database;
  }
}

export class DeleteDatabaseResponse {
  database: string;

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);
    return new DeleteDatabaseResponse(json['database']);
  }

  constructor(database: string) {
    this.database = database;
  }
}

export class Job {
  query: string;
  type: string;
  priority: number;
  retryLimit: number;
  duration: number;
  status: string;
  cpuTime: number;
  resultSize: number;
  jobId: string;
  createdAt: string;
  updatedAt: string;
  startAt: string;
  endAt: string;
  numRecords: number;
  database: string;
  userName: string;
  result: string;
  url: string;
  hiveResultSchema: string;
  organization: string;
  linkedResultExportJobId: string;
  resultExportTargetJobId: string;
  debug: string;

  static fromJson(jsonStr: string): Job {
    const json = JSON.parse(jsonStr);
    return new Job(
      json['query'],
      json['type'],
      json['priority'],
      json['retry_limit'],
      json['duration'],
      json['status'],
      json['cpu_time'],
      json['result_size'],
      json['job_id'],
      json['created_at'],
      json['updated_at'],
      json['start_at'],
      json['end_at'],
      json['num_records'],
      json['database'],
      json['user_name'],
      json['result'],
      json['url'],
      json['hive_result_schema'],
      json['organization'],
      json['linked_result_export_job_id'],
      json['result_export_target_job_id'],
      json['debug']
    );
  }

  constructor(query: string,
              type: string,
              priority: number,
              retryLimit: number,
              duration: number,
              status: string,
              cpuTime: number,
              resultSize: number,
              jobId: string,
              createdAt: string,
              updatedAt: string,
              startAt: string,
              endAt: string,
              numRecords: number,
              database: string,
              userName: string,
              result: string,
              url: string,
              hiveResultSchema: string,
              organization: string,
              linkedResultExportJobId: string,
              resultExportTargetJobId: string,
              debug: string = null) {
    this.query = query;
    this.type = type;
    this.priority = priority;
    this.retryLimit = retryLimit;
    this.duration = duration;
    this.status = status;
    this.cpuTime = cpuTime;
    this.resultSize = resultSize;
    this.jobId = jobId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.startAt = startAt;
    this.endAt = endAt;
    this.numRecords = numRecords;
    this.database = database;
    this.userName = userName;
    this.result = result;
    this.url = url;
    this.hiveResultSchema = hiveResultSchema;
    this.organization = organization;
    this.linkedResultExportJobId = linkedResultExportJobId;
    this.resultExportTargetJobId = resultExportTargetJobId;
    this.debug = debug;
  }
}

export class ListJobsResponse {
  jobs: Job[];

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);

    /* tslint:disable-next-line:no-any */
    const jobs = json['jobs'].map((j: any) => {
      return new Job(j.query, j.type, j.priority, j.retry_limit, j.duration,
        j.status, j.cpu_time, j.result_size, j.job_id, j.created_at,
        j.updated_at, j.start_at, j.end_at, j.num_records, j.database,
        j.user_name, j.result, j.url, j.hive_result_schema, j.organization,
        j.linked_result_export_job_id, j.result_export_target_job_id);
    });
    return new ListJobsResponse(jobs);
  }

  constructor(jobs: Job[]) {
    this.jobs = jobs;
  }
}

class Table {
  id: string;
  name: string;
  counterUpdatedAt: string;
  lastLogTimestamp: string;
  deleteProtected: boolean;
  createdAt: string;
  updatedAt: string;
  type: string;
  includeV: boolean;
  count: number;
  schema: string;
  expireDays: string;

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);
    return new Table(
      json['id'],
      json['name'],
      json['counter_updated_at'],
      json['last_log_timestamp'],
      json['delete_protected'],
      json['created_at'],
      json['updated_at'],
      json['type'],
      json['include_v'],
      json['count'],
      json['schema'],
      json['expire_days']
    );
  }

  constructor(id: string,
              name: string,
              counterUpdatedAt: string,
              lastLogTimestamp: string,
              deleteProtected: boolean,
              createdAt: string,
              updatedAt: string,
              type: string,
              includeV: boolean,
              count: number,
              schema: string,
              expireDays: string) {
    this.id = id;
    this.name = name;
    this.counterUpdatedAt = counterUpdatedAt;
    this.lastLogTimestamp = lastLogTimestamp;
    this.deleteProtected = deleteProtected;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.type = type;
    this.includeV = includeV;
    this.count = count;
    this.schema = schema;
    this.expireDays = expireDays;
  }
}

export class ListTablesResponse {
  database: string;
  tables: Table[];

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);
    const database = json['database'];

    /* tslint:disable-next-line:no-any */
    const tables = json['tables'].map((t: any) => {
      return new Table(t.id, t.name, t.counter_updated_at,
        t.last_log_timestamp, t.delete_protected,
        t.created_at, t.updated_at, t.type,
        t.include_v, t.count, t.schema, t.expire_days);
    });
    return new ListTablesResponse(database, tables);
  }

  constructor(database: string, tables: Table[]) {
    this.database = database;
    this.tables = tables;
  }
}

export class CreateTableResponse {
  database: string;
  table: string;
  type: string;

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);
    const database = json['database'];
    const table = json['table'];
    const type = json['type'];
    return new CreateTableResponse(database, table, type);
  }

  constructor(database: string, table: string, type: string) {
    this.database = database;
    this.table = table;
    this.type = type;
  }
}

export class DeleteTableResponse {
  database: string;
  table: string;

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);
    const database = json['database'];
    const table = json['table'];
    return new DeleteTableResponse(database, table);
  }

  constructor(database: string, table: string) {
    this.database = database;
    this.table = table;
  }
}

export class KillResponse {
  jobId: string;
  formerStatus: string;

  static fromJson(jsonStr: string): KillResponse {
    const json = JSON.parse(jsonStr);
    return new KillResponse(
      json['job_id'],
      json['former_status']
    );
  }

  constructor(jobId: string, formerStatus: string) {
    this.jobId = jobId;
    this.formerStatus = formerStatus;
  }
}