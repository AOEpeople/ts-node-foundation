export interface RepositoryInterface {
    create: Function;
    fetchAll: Function;
    fetch: Function;
    update: Function;
    remove: Function;
    disconnect?: Function;
}