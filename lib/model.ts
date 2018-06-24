class Database {
  name: string;
  created_at: string;
  updated_at: string;
  count: number;
  organization: number;
  permission: string;
  deleted_protected: boolean;

  constructor(name: string, created_at: string, updated_at: string, count: number, organization: number, permission: string, deleted_protected: boolean) {
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.count = count;
    this.organization = organization;
    this.permission = permission;
    this.deleted_protected = deleted_protected;
  }
}

/**
 * Represents a returned value from list databases requests.
 */
export class ListDatabasesResponse {
  databases: Database[];

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);

    const databases = json['databases'].map((d: any) => {
      return new Database(d.name, d.created_at, d.updated_at, d.count, d.organization, d.permission, d.deleted_protected);
    });
    return new ListDatabasesResponse(databases)
  }

  constructor(databases: Database[]) {
    this.databases = databases;
  }
}

export class CreateDatabaseResponse {
  database: string;

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);
    return new CreateDatabaseResponse(json["database"]);
  }

  constructor(database: string) {
    this.database = database;
  }
}

export class DeleteDatabaseResponse {
  database: string;

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);
    return new DeleteDatabaseResponse(json["database"]);
  }

  constructor(database: string) {
    this.database = database;
  }
}

export class Job {
  query: string;
  type: string;
  priority: number;
  retry_limit: number;
  duration: number;
  status: string;
  cpu_time: number;
  result_size: number;
  job_id: string;
  created_at: string;
  updated_at: string;
  start_at: string;
  end_at: string;
  num_records: number;
  database: string;
  user_name: string;
  result: string;
  url: string;
  hive_result_schema: string;
  organization: string;
  linked_result_export_job_id: string;
  result_export_target_job_id: string;
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
    )
  }

  constructor(query: string, type: string, priority: number, retry_limit: number, duration: number, status: string, cpu_time: number, result_size: number, job_id: string, created_at: string, updated_at: string, start_at: string, end_at: string, num_records: number, database: string, user_name: string, result: string, url: string, hive_result_schema: string, organization: string, linked_result_export_job_id: string, result_export_target_job_id: string, debug: string = null) {
    this.query = query;
    this.type = type;
    this.priority = priority;
    this.retry_limit = retry_limit;
    this.duration = duration;
    this.status = status;
    this.cpu_time = cpu_time;
    this.result_size = result_size;
    this.job_id = job_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.start_at = start_at;
    this.end_at = end_at;
    this.num_records = num_records;
    this.database = database;
    this.user_name = user_name;
    this.result = result;
    this.url = url;
    this.hive_result_schema = hive_result_schema;
    this.organization = organization;
    this.linked_result_export_job_id = linked_result_export_job_id;
    this.result_export_target_job_id = result_export_target_job_id;
    this.debug = debug;
  }
}

export class ListJobsResponse {
  jobs: Job[];

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);

    const jobs = json['jobs'].map((j: any) => {
      return new Job(j.query, j.type, j.priority, j.retry_limit, j.duration, j.status, j.cpu_time, j.result_size, j.job_id, j.created_at, j.updated_at, j.start_at, j.end_at, j.num_records, j.dataabse, j.user_name, j.result, j.url, j.hive_result_schema, j.organization, j.linked_result_export_job_id, j.result_export_target_job_id);
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
  counter_updated_at: string;
  last_log_timestamp: string;
  delete_protected: boolean;
  created_at: string;
  updated_at: string;
  type: string;
  include_v: boolean;
  count: number;
  schema: string;
  expire_days: string;

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
    )
  }

  constructor(id: string, name: string, counter_updated_at: string, last_log_timestamp: string, delete_protected: boolean, created_at: string, updated_at: string, type: string, include_v: boolean, count: number, schema: string, expire_days: string) {
    this.id = id;
    this.name = name;
    this.counter_updated_at = counter_updated_at;
    this.last_log_timestamp = last_log_timestamp;
    this.delete_protected = delete_protected;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.type = type;
    this.include_v = include_v;
    this.count = count;
    this.schema = schema;
    this.expire_days = expire_days;
  }
}

export class ListTablesResponse {
  database: string;
  tables: Table[];

  static fromJson(jsonStr: string) {
    const json = JSON.parse(jsonStr);
    const database = json['database'];
    const tables = json['tables'].map((t: any) => {
      return new Table(t.id, t.name, t.counter_updated_at, t.last_log_timestamp, t.delete_protected, t.created_at, t.updated_at, t.type, t.include_v, t.count, t.schema, t.expire_days);
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
    )
  }

  constructor(jobId: string, formerStatus: string) {
    this.jobId = jobId;
    this.formerStatus = formerStatus;
  }
}