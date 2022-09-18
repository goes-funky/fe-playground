import { BehaviorSubject, Observable } from 'rxjs';

export interface UpdateEntity<T> {
  id: string;
  changes: Partial<T>;
}

export abstract class EntityManagerServiceAbstract<T> {
  private entitySubject = new BehaviorSubject<T[]>([]);
  protected entities: Map<string, T> = new Map<string, T>();
  protected ids: string[] = [];

  protected abstract selectId(entity: T): string;
  protected abstract sortComparer(m1: T | undefined, m2: T | undefined): number;

  getState(): Observable<T[]> {
    return this.entitySubject.asObservable();
  }

  getAllEntities(): T[] {
    return this.ids.map((id) => this.entities.get(id)).sort(this.sortComparer) as T[];
  }

  getById(id: string): T | null {
    return this.entities.get(id) ?? null;
  }

  setAll(entities: T[], emitChanges = true) {
    this.entities = new Map<string, T>();
    this.ids = [];
    this.addMany(entities, false);
    if (emitChanges) {
      this.entitySubject.next(this.getAllEntities());
    }
  }

  addOne(entity: T, emitChanges = true) {
    const id = this.selectId(entity);
    this.entities.set(id, entity);
    this.ids.push(id);
    if (emitChanges) {
      this.entitySubject.next(this.getAllEntities());
    }
  }

  addMany(entities: T[], emitChanges = true) {
    entities.forEach((entity) => {
      this.addOne(entity, false);
    });

    if (emitChanges) {
      this.entitySubject.next(this.getAllEntities());
    }
  }

  updateOne(entity: UpdateEntity<T>, emitChanges = true) {
    const entityToUpdate = this.entities.get(entity.id);
    Object.keys(entity.changes).forEach((key) => {
      entityToUpdate[key] = entity.changes[key];
    });

    if (emitChanges) {
      this.entitySubject.next(this.getAllEntities());
    }
  }

  updateMany(entities: UpdateEntity<T>[], emitChanges = true) {
    entities.forEach((entity) => {
      this.updateOne(entity, false);
    });
    if (emitChanges) {
      this.entitySubject.next(this.getAllEntities());
    }
  }

  removeOne(key: string, emitChanges = true) {
    this.ids = this.ids.filter((id) => id !== key);
    this.entities.delete(key);
    if (emitChanges) {
      this.entitySubject.next(this.getAllEntities());
    }
  }
}
