import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Icrud } from './icrud.interface';
import { Model } from '../models/model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';

export abstract class ServiceFirebase<T extends Model>
implements Icrud<T> {

    ref: AngularFirestoreCollection<T>;

    constructor(protected type: new() => T ,
                protected firestore: AngularFirestore,
                public path: string
    ) {
        this.ref = this.firestore.collection<T>(this.path);
    }

    get(id: string): Observable<T> {
        const doc = this.ref.doc<T>(id);
        return doc.get().pipe(
            map(snapshot => this.docToClass(snapshot))
        );
    }


    list(): Observable<T[]> {
        return this.ref.valueChanges();
    }

    createOrUpdate(item: T): Promise<any> {
        const id = item.id;

        if (!item) {
            return;
        }

        let obj = null;

        if (item instanceof this.type) {
            obj = item.toObject();
        } else {
            obj = item;
        }

        if (id) {
            return this.ref.doc(id).set(obj);
        } else {
            return this.ref.add(obj).then(res => {
            obj.id = res.id,
            this.ref.doc(res.id).set(obj);
        }
        );
        }
    }

    delete(id: string): Promise<void> {
        return this.ref.doc(id).delete();
    }

    docToClass(snapshotDoc): T {
        const obj = { id: snapshotDoc.id,
        ...(snapshotDoc.data() as T)
        };

        const typed = plainToClass(this.type, obj);
        return typed;
        }

}
