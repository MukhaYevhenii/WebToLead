import { LightningElement,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import FamilyProduct from '@salesforce/schema/Product2.Family';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import PRODUCT_OBJECT from '@salesforce/schema/Product2';

export default class ProductFamilyPicklist extends LightningElement {
    productFamily;

    @wire(getObjectInfo, { objectApiName: PRODUCT_OBJECT })
    productInfo;

    @wire(getPicklistValues,
        {
            recordTypeId: '$productInfo.data.defaultRecordTypeId',
            fieldApiName: FamilyProduct
        }
    )
    leadSourceValues;

    handleChange(event){
        this.productFamily = event.target.value;
        const familyEvent = new CustomEvent("getfamilyvalue",{
            detail: this.productFamily
        });

        this.dispatchEvent(familyEvent);
    }
}