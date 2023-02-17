
import { DefaultDIDAdapter, DID, DIDBackend, DIDDocument } from '@elastosfoundation/did-js-sdk'

export class DidHelper {
    constructor() {
        this.init()
    }

    private init(): string {
        const currentNet = 'MainNet'.toLowerCase()
        if (!DIDBackend.isInitialized()) {
            DIDBackend.initialize(new DefaultDIDAdapter(currentNet))
        }
        return currentNet
    }

    resolveDidDocument(didString: string): Promise<DIDDocument> {
        return new Promise((resolve, reject) => {
            const userDID = DID.from(didString)
            userDID.resolve().then((userDIDDocument: DIDDocument) => {
                resolve(userDIDDocument)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    verify(didDocument: DIDDocument, signature: string, ...data: Buffer[]): boolean {
        return didDocument.verify(null, signature, ...data)
    }
}