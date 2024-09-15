type BaseAsset = {
    id: string;
    description: string;    
}

type ImageAsset = BaseAsset & {
    imgUrl: string;
}
type VideoAsset = BaseAsset & {
    videoUrl: string;
    extension: string; // .mp4 | .mkv
}
type DocumentAsset = BaseAsset & {
    documentUrl: string;
    extension: string; // .pfd | .txt
}

type MediaAsset = OneOf<[ImageAsset, VideoAsset, DocumentAsset]>;
type MediaAsset_Union = ImageAsset | VideoAsset | DocumentAsset;
/* 
    can solve selection by `is` as matching a discriminator in the specific types
    type ImageAsset = BaseAsset & {
        discriminator: '_ImageAsset';
        imgUrl: string;
    }
*/


/**
 * @description Helper to take 2 types and return a intersection of first `T` and exclusions for 
 * all unique key of `X`
 * @param T Core type to include all of.
 * @param X additional type to add exclusion rules for.
 * @author Typed Rocks <pre>https://www.youtube.com/@Typed-Rocks</pre>
 */
type OnlyFirst<T, X> = T & {[Key in keyof Omit<X, keyof T>]?: never};

/**
 * @description Helper to take a collection of `n` type definitions and return a complete 
 * intersection of this collection
 * @param TypesArray The collection of types, as an array, to intersect on.
 * @param Result placeholder var for recursive calling as well as the var for storing our result.
 * @author Typed Rocks <pre>https://www.youtube.com/@Typed-Rocks</pre>
 */
type MergeTypes<TypesArray extends any[], Result = {}> =
    TypesArray extends [infer Head, ...infer Remainder]
        ? MergeTypes<Remainder, Result & Head>
        : Result;

/**
 * @description Helper to take take a collection of types and return a new type that is representative of 
 * these types as an exclusive join rather than a merged union.
 * @param TypesArray The collection of types, as an array, to create our exclusive `only of these types` type.
 * @param Result placeholder var for recursive calling as well as the var for storing our result.
 * @param AllProperties Cascaded collection of All possible properties from first call.
 * @returns `type: never` in case of an error, otherwise: an intersected type allowing for exclusively 
 * only the types from TypeArray and not their merged result
 * @author Typed Rocks <pre>https://www.youtube.com/@Typed-Rocks</pre>
 */
type OneOf<
    TypesArray extends any[], 
    Result = never, 
    AllProperties = MergeTypes<TypesArray>
> = 
    TypesArray extends [infer Head, ...infer Remainder]
        ? OneOf<Remainder, Result | OnlyFirst<Head, AllProperties>, AllProperties>
        : Result;


// bellow is bugged as its a merged type with part from type a and others from type b
const overflowedAsset : MediaAsset_Union = {
    id: '1',
    description: 'test asset',
    imgUrl: '/assets/img/123.jpg',
    extension: 'jpg',
}

const singularAsset : MediaAsset = {
    id: '1',
    description: 'test asset',
    documentUrl: '/assets/img/123.jpg',
    extension: 'jpg',
}
