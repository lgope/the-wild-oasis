import supabase, { imageBucketName, supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be fetched");
    }
    return data;
}

export async function deleteCabin(id: number) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted");
    }
    return data;
}

// https://mduiaridvnmrzoyjpofz.supabase.co/storage/v1/object/public/wild-oasis-images/cabin-001.jpg
export async function createEditCabin(newCabin: any, id?: number) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${
        newCabin.image.name as string
    }`.replaceAll("/", "");
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/${imageBucketName}/${imageName}`;

    // 1. Create/edit cabin
    let query: any = supabase.from("cabins");

    // A) CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) EDIT
    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();
    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    // 2. Upload image
    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from(imageBucketName)
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was an error uplaoding image
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin image could not be uploaded and the cabin was not created"
        );
    }

    return data;
}
