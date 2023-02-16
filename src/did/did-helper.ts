import { DefaultDIDAdapter, DID, DIDBackend, DIDDocument } from '@elastosfoundation/did-js-sdk'

export class DidHelper {
    constructor() {
        DidHelper.init()
    }

    private static init(): string {
        const currentNet = 'MainNet'.toLowerCase()
        if (!DIDBackend.isInitialized()) {
            DIDBackend.initialize(new DefaultDIDAdapter(currentNet))
        }
        return currentNet
    }

    public static resolveDidDocument(didString: string): Promise<DIDDocument> {
        return new Promise((resolve, reject) => {
            DidHelper.init()
            const userDID = DID.from(didString)
            userDID.resolve().then((userDIDDocument: DIDDocument) => {
                resolve(userDIDDocument)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static verify(didString: string, signature: string, ...data: Buffer[]): Promise<boolean> {
        return new Promise((resolve, reject) => {
            DidHelper.resolveDidDocument(didString).then((didDocument: DIDDocument) => {
                const verifyResult = didDocument.verify(null, signature, ...data)
                resolve(verifyResult)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}