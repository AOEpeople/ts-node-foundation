export interface PersistenceInterface {
    create: Function;
    fetchAll: Function;
    fetch: Function;
    update: Function;
    remove: Function;
    disconnect?: Function;
}