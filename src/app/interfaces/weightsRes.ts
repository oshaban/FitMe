
/**
 * Interface for GET response from /api/weights/
 */
export interface WeightsGetData {
    _id: string;
    user: string;
    weight: {id: string, value: number, name: Date}[];
}

/* Example weights recieved: */
/* {"_id":"5d48b21258e1665f0058b100",
"user":"5d48b21258e1665f0058b0ff",
"weight":[{"_id":"5d48b21258e1665f0058b101","value":81,"name":"2019-08-05T22:47:46.745Z"}],"__v":0} */