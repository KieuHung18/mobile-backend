import NotFoundError from "../errors/not-found.error";
import { ArtworkProps } from "../models/artwork.model";
import { Ideal, IdealProps } from "../models/ideal.model";

class IdealService {
  public async create(ideal): Promise<IdealProps> {
    ideal.publish = true;
    return (await Ideal.create(ideal)) as IdealProps;
  }

  public async retrive(id: string): Promise<IdealProps> {
    const ideal = await Ideal.findByPk(id);

    if (ideal) {
      return ideal as IdealProps;
    } else {
      throw new NotFoundError("IdealQueryError", "Ideal not found");
    }
  }
  public async update(id: string, data): Promise<IdealProps> {
    const ideal = await this.retrive(id);
    Object.assign(ideal, data);
    return (await ideal.save()) as IdealProps;
  }
  public async delete(id: string): Promise<IdealProps> {
    const artwork = await this.retrive(id);
    await artwork.destroy();
    return artwork;
  }
  public async list(): Promise<IdealProps[]> {
    return (await Ideal.findAll()) as IdealProps[];
  }
  public async publishList(): Promise<IdealProps[]> {
    return (await Ideal.findAll({
      where: {
        publish: true,
      },
    })) as IdealProps[];
  }
  public async getSize(ideals: IdealProps[]): Promise<IdealProps[]> {
    for (const ideal of ideals) {
      ideal.dataValues.size = await ideal.countArtworks();
    }
    return ideals;
  }
  public async addThumbnail(ideals: IdealProps[]): Promise<IdealProps[]> {
    for (const ideal of ideals) {
      const artworks = (await ideal.getArtworks({
        order: [["createdAt", "DESC"]],
      })) as ArtworkProps[];
      if (artworks[0]) {
        ideal.dataValues.thumbnail = artworks[0].dataValues.url;
      } else {
        ideal.dataValues.thumbnail =
          "https://res.cloudinary.com/dlljuyhvh/image/upload/v1685448207/aafb06eb839e4124bb84a74734da28d1_z4p9fg.png";
      }
    }
    return ideals;
  }
}
export default IdealService;
