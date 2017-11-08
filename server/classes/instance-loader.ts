export class InstanceLoader {
    static getInstance<T>(context: Object, name: string, ...args: any[]): T {
        let instance = Object.create(context[name].prototype);
        instance.constructor.apply(instance, args);
        return <T> instance;
    }
}