import {TD} from './td';
import {describe, it} from 'mocha';
import {expect, assert} from 'chai';
import * as chai from 'chai';
import * as nock from 'nock';

describe('TD Client', () => {
  chai.should();
  const apikey = "apikey";
  const td = new TD(apikey);

  const server = nock("http://api.treasuredata.com")
    .get('/v3/database/list')
    .reply(200, {
      databases: [
        {name: "table1", created_at: "2018-06-25", updated_at: "2018-06-25", count: 123, organization: 1, permission: "ok",deleted_protected: false},
        {name: "table2", created_at: "2018-06-25", updated_at: "2018-06-25", count: 123, organization: 1, permission: "ok",deleted_protected: false}
      ]
    })
    .post('/v3/database/create/test_db')
    .reply(200, {
      database: 'test_db'
    })
    .post('/v3/database/delete/test_db')
    .reply(200, {
      database: 'test_db'
    })
    .get('/v3/job/list')
    .reply(200, {
      jobs: [
        {query: "SELECT * FROM www_access", type: 'presto', priority: 1, retry_limit: 2, duration: 60, status: "SUCCESS", cpu_time: 1234, result_size: 1024, job_id: 1234, created_at: "2018-06-25", updated_at: "2018-06-25", start_at: "2018-06-25", end_at: "2018-06-25", num_records: 1000, database: "test_db", user_name: "kaisasaki", result: null, url: "http://console.treasuredata.com/jobs/1234", hive_result_schema: null, organization: "Treasure Data", linked_result_Export_job_id: null, result_export_target_job_id: null, debug: null},
        {query: "SELECT * FROM www_access", type: 'hive', priority: 1, retry_limit: 2, duration: 60, status: "SUCCESS", cpu_time: 1234, result_size: 1024, job_id: 1234, created_at: "2018-06-25", updated_at: "2018-06-25", start_at: "2018-06-25", end_at: "2018-06-25", num_records: 1000, database: "test_db", user_name: "kaisasaki", result: null, url: "http://console.treasuredata.com/jobs/1234", hive_result_schema: null, organization: "Treasure Data", linked_result_Export_job_id: null, result_export_target_job_id: null, debug: null}
      ]
    })
    .get('/v3/table/list/test_db')
    .reply(200, {
      database: "test_db",
      tables: [
        {id: "1234", name: "table1", counter_updated_at: "2018-06-25"},
        {id: "1235", name: "table2", counter_updated_at: "2018-06-25"}
      ]
    })
    .post('/v3/table/create/test_db/table1/log')
    .reply(200, {
      database: "test_db",
      table: "table1",
      type: "log"
    })
    .post('/v3/table/delete/test_db/table1')
    .reply(200, {
      database: "test_db",
      table: "table1"
    })
    .get('/v3/job/show/1234')
    .reply(200, {
      query: "SELECT * FROM www_access",
      type: "presto",
      priority: 1,
      retry_limit: 100
    })
    .post('/v3/job/kill/1234')
    .reply(200, {
      job_id: "1234",
      former_status: "RUNNING"
    });

  it('should get list of database', async () => {
    let ret = await td.listDatabases();
    expect(ret.databases).to.have.length(2);
    expect(ret.databases[0]).to.haveOwnProperty('name');
  });

  it('should create a database', async () => {
    let ret = await td.createDatabase('test_db');
    expect(ret.database).to.be.equal('test_db');
  });

  it('should delete a database', async () => {
    let ret = await td.deleteDatabase('test_db');
    expect(ret.database).to.be.equal('test_db');
  });

  it('should get job list', async () => {
    let ret = await td.listJobs();
    expect(ret.jobs).to.have.length(2);
    expect(ret.jobs[0]).to.haveOwnProperty("query").with.equal("SELECT * FROM www_access");
  });

  it('should get table list', async () => {
    let ret = await td.listTables('test_db');
    expect(ret.database).to.be.equal('test_db');
    expect(ret.tables).to.have.length(2);
  });

  it('should create a table', async () => {
    let ret = await td.createTable("test_db", "table1", "log");
    expect(ret.database).to.be.equal("test_db");
    expect(ret.table).to.be.equal("table1");
    expect(ret.type).to.be.equal("log");
  });

  it('should delete a table', async () => {
    let ret = await td.deleteTable("test_db", "table1");
    expect(ret.database).to.be.equal("test_db");
    expect(ret.table).to.be.equal("table1");
  });

  it('should get a job', async () => {
    let ret = await td.showJob("1234");
    expect(ret.query).to.be.equal("SELECT * FROM www_access");
  });

  it('should kill the job', async () => {
    let ret = await td.kill("1234");
    expect(ret.jobId).to.be.equal("1234");
    expect(ret.formerStatus).to.be.equal("RUNNING");
  });
});