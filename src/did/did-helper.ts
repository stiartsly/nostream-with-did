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
            console.log('resolveDidDocument====>1111111')
            const userDID = DID.from(didString)
            console.log('resolveDidDocument====>didString=', didString)
            console.log('resolveDidDocument====>userDID=', userDID)
            userDID.resolve().then((userDIDDocument: DIDDocument) => {
                console.log('resolveDidDocument====>userDID=', userDIDDocument)
                resolve(userDIDDocument)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    public static verify(didString: string, signature: string, ...data: Buffer[]): Promise<boolean> {
        return new Promise((resolve, reject) => {
            console.log('verify====>didString=', didString)
            console.log('verify====>signature=', signature)
            console.log('verify====>data=', data)
            DidHelper.resolveDidDocument(didString).then((didDocument: DIDDocument) => {
                console.log('verify====>didDocument=', didDocument)
                const verifyResult = didDocument.verify(null, signature, ...data)
                console.log('verify====>verifyResult=', verifyResult)
                resolve(verifyResult)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}