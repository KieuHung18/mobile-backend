import { Artwork, ArtworkProps } from "../models/artwork.model";

class ArtworkService {
  public async create(artwork): Promise<ArtworkProps> {
    return (await Artwork.create(artwork)) as ArtworkProps;
  }
}
export default ArtworkService;
