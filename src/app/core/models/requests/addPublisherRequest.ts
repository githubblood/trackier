export class AddPublisherRequest {
    name!: string;
    email!: string;
    accountStatus: string = 'Active';
    country: string = 'IN';
    company!: string;
    website!: string;
    trafficSources!: string;
    referenceId!: string;
    password!: string;
    accountManager!: string;
    phone!: string;
    skype!: string;
    address!: string;
    city!: string;
    state!: string;
    zipcode!: string;
    tags!: string;
    taxId!: string;
    advancedCountry!: string;
    username!: string;
    notes!: string;
}